import handleError from '../utils/handleError.js';
import buildErrorObject from '../utils/buildErrorObject.js';
import buildResponse from '../utils/buildResponse.js';
import { matchedData } from 'express-validator';
import httpStatus from 'http-status';
import GameInfo from '../models/game-info.schema.js';
import encrypt from '../utils/encrypt.js';
import decrypt from '../utils/decrypt.js';
import { GameQuestions } from '../models/game-questions.schema.js';
import mongoose from 'mongoose';

export const listDropdownController = async (req, res) => {
  try {
    const games = await GameInfo.find({ isDeleted: { $ne: true } })
      .select('title _id')
      .lean();
    res
      .status(httpStatus.OK)
      .json(
        buildResponse(httpStatus.OK, games, 'Games retrieved successfully')
      );
  } catch (err) {
    handleError(res, err);
  }
};

export const createGameInfoController = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    console.log({ validatedData })

    if (validatedData.username) {
      const existingGameInfo = await GameInfo.findOne({
        username: validatedData.username,
        isDeleted: {
          $ne: true
        }
      });

      if (existingGameInfo) {
        throw buildErrorObject(
          httpStatus.CONFLICT,
          'Game with username already exists'
        );
      }
    }

    if (validatedData.password) {
      validatedData.password = encrypt(validatedData.password);
    }

    const newGame = await GameInfo.create(validatedData);

    res
      .status(httpStatus.CREATED)
      .json(
        buildResponse(httpStatus.CREATED, newGame, 'Game created successfully')
      );
  } catch (err) {
    handleError(res, err);
  }
};

export const updateGameInfoController = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ['params'] });
    const validatedData = matchedData(req, { locations: ['body'] });

    console.log('validatedData', validatedData);

    const existingGame = await GameInfo.findById(id);

    if (!existingGame) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game not found');
    }

    if (existingGame.isDeleted) {
      throw buildErrorObject(httpStatus.BAD_REQUEST, 'Game is deleted');
    }

    if (
      validatedData.username &&
      validatedData.username !== existingGame.username
    ) {
      const duplicateUsername = await GameInfo.findOne({
        username: validatedData.username,
        _id: { $ne: id }
      });

      if (duplicateUsername) {
        throw buildErrorObject(
          httpStatus.CONFLICT,
          'Game with username already exists'
        );
      }
    }

    if (validatedData.password) {
      validatedData.password = encrypt(validatedData.password);
    }

    if (!validatedData.backGroundImage) {
      validatedData.backGroundImage = null;
    }

    if (validatedData.timeLimit) {
      if (validatedData.timeLimit === 'no_time_limit') {
        validatedData.duration = undefined;
        validatedData.endTime = undefined;
      } else if (validatedData.timeLimit === 'duration') {
        validatedData.endTime = undefined;
      } else if (validatedData.timeLimit === 'end_time') {
        validatedData.duration = undefined;
      }
    }

    const updatedGame = await GameInfo.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true
    });

    res
      .status(httpStatus.OK)
      .json(
        buildResponse(httpStatus.OK, updatedGame, 'Game updated successfully')
      );
  } catch (err) {
    handleError(res, err);
  }
};

export const getGameInfoByIdController = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const game = await GameInfo.findById(id).populate('tags', 'name').lean();

    if (!game) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game not found');
    }

    if (game.isDeleted) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game  deleted');
    }

    if (game.password) {
      game.password = decrypt(game.password);
    }

    res
      .status(httpStatus.OK)
      .json(buildResponse(httpStatus.OK, game, 'Game retrieved successfully'));
  } catch (err) {
    handleError(res, err);
  }
};

export const getAllGamesController = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const page = Math.max(1, parseInt(validatedData.page)) || 1;
    const limit =
      Math.max(1, Math.min(100, parseInt(validatedData.limit))) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    filter.isDeleted = {
      $ne: true
    };

    if (validatedData.status && validatedData.status !== 'all') {
      filter.status = validatedData.status;
    }

    if (validatedData.isActive !== undefined) {
      filter.isActive =
        validatedData.isActive === 'true' || validatedData.isActive === true;
    }

    if (validatedData.tags && validatedData.tags.length > 0) {
      filter.tags = {
        $in: validatedData.tags
      };
    }

    console.log('lang', validatedData.language);

    if (validatedData.language) {
      filter.language = validatedData.language;
    }

    if (validatedData.timeLimit) {
      filter.timeLimit = validatedData.timeLimit;
    }

    if (validatedData.search) {
      const searchRegex = new RegExp(validatedData.search, 'i');
      filter.$or = [{ title: searchRegex }, { username: searchRegex }];
    }

    const sortOrder = validatedData.updatedAt === 'asc' ? 1 : -1;

    const totalDocs = await GameInfo.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);

    const games = await GameInfo.find(filter)
      .select(
        'username password title status isActive language timeLimit duration endTime tags thumbnail createdAt updatedAt'
      )
      .populate('tags', 'name')
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const gamesWithDecryptedPasswords = games.map((game) => ({
      ...game,
      password: game.password ? decrypt(game.password) : null
    }));

    const response = {
      docs: gamesWithDecryptedPasswords,
      totalDocs,
      limit,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    res
      .status(httpStatus.OK)
      .json(
        buildResponse(httpStatus.OK, response, 'Games retrieved successfully')
      );
  } catch (err) {
    handleError(res, err);
  }
};

export const toggleActiveStatusController = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const game = await GameInfo.findById(id);

    if (!game) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game not found');
    }

    if (game.isDeleted) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game already deleted');
    }

    const status = game.status === 'active' ? 'inactive' : 'active';
    game.status = status;

    await game.save();

    res
      .status(httpStatus.OK)
      .json(
        buildResponse(httpStatus.OK, {}, 'Game status updated successfully')
      );
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteGameController = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const game = await GameInfo.findById(id);

    if (!game) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game not found');
    }

    if (game.isDeleted) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game already deleted');
    }

    game.isDeleted = true;
    await game.save();

    res
      .status(httpStatus.OK)
      .json(buildResponse(httpStatus.OK, 'Game deleted successfully'));
  } catch (err) {
    handleError(res, err);
  }
};

export const cloneGameInfoController = async (req, res) => {
  try {
    const { id } = matchedData(req);

    console.log('🔍 Starting game clone for ID:', id);

    // Fetch original game data
    const [game, gameQuestionsList] = await Promise.all([
      GameInfo.findById(id),
      GameQuestions.find({ game: id })
    ]);

    console.log('📊 Found:', {
      game: !!game,
      gameQuestions: gameQuestionsList.length
    });

    if (!game) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game not found');
    }

    if (game.isDeleted === true) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Game is deleted');
    }

    // Clone main game info
    const clonedGameData = {
      ...game.toObject(),
      _id: new mongoose.Types.ObjectId(),
      title: `${game.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false
    };
    delete clonedGameData.__v;

    const clonedGame = new GameInfo(clonedGameData);
    await clonedGame.save();
    console.log('✅ Cloned game created:', clonedGame._id);

    // Clone game questions but REFERENCE existing questions (don't clone them)
    if (gameQuestionsList.length > 0) {
      const clonedGameQuestions = gameQuestionsList.map((gameQuestion) => {
        const clonedGameQuestionData = {
          ...gameQuestion.toObject(),
          _id: new mongoose.Types.ObjectId(),
          game: clonedGame._id, // Point to new game
          createdAt: new Date(),
          updatedAt: new Date()
        };
        delete clonedGameQuestionData.__v;

        // Keep the SAME question references (don't create new question objects)
        // The questions array will contain the same questionId references
        if (gameQuestion.questions && gameQuestion.questions.length > 0) {
          clonedGameQuestionData.questions = gameQuestion.questions.map(
            (question) => ({
              ...question, // Keep original question data including the same questionId
              _id: new mongoose.Types.ObjectId() // Only create new ID for the placement, not the question itself
            })
          );
        }

        return new GameQuestions(clonedGameQuestionData);
      });

      await GameQuestions.insertMany(clonedGameQuestions);
      console.log(
        '✅ Cloned game questions with referenced questions:',
        gameQuestionsList.length
      );
    }

    // Calculate total referenced questions
    const totalQuestions = gameQuestionsList.reduce(
      (total, gq) => total + (gq.questions ? gq.questions.length : 0),
      0
    );

    const responseData = {
      clonedGameId: clonedGame._id,
      originalGameId: id,
      clonedData: {
        game: true,
        gameQuestions: gameQuestionsList.length,
        totalReferencedQuestions: totalQuestions,
        note: 'Questions are referenced, not cloned'
      }
    };

    res
      .status(httpStatus.CREATED)
      .json(
        buildResponse(
          httpStatus.CREATED,
          responseData,
          'Game cloned successfully with referenced questions'
        )
      );
  } catch (error) {
    console.error('❌ Game clone error:', error);
    handleError(res, error);
  }
};
