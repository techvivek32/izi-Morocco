import handleError from "../utils/handleError.js";
import buildErrorObject from "../utils/buildErrorObject.js";
import buildResponse from "../utils/buildResponse.js";
import { matchedData } from "express-validator";
import httpStatus from 'http-status';
import Puzzles from '../models/puzzle.schema.js';


export const createPuzzleController = async (req, res) => {
    try {
        const validatedData = matchedData(req);

        const existingPuzzle = await Puzzles.findOne({
            url: validatedData.url,
            isDeleted: false
        });

        if (existingPuzzle) {
            throw buildErrorObject(httpStatus.CONFLICT, 'Puzzle with same URL already exists');
        }

        const newPuzzle = await Puzzles.create({
            name: validatedData.name,
            url: validatedData.url,
            createdBy: req.user?.id || validatedData.createdBy
        });

        res.status(httpStatus.CREATED).json(
            buildResponse(httpStatus.CREATED, newPuzzle, 'Puzzle created successfully')
        );

    } catch (err) {
        if (err.code === 11000) {
            throw buildErrorObject(httpStatus.CONFLICT, 'Puzzle already exists');
        }
        handleError(res, err);
    }
};


export const getPuzzlesController = async (req, res) => {
    try {
        let { page = 1, limit = 50, search = '' } = matchedData(req);
        page = Number(page) || 1;
        limit = Number(limit) || 50;
        if (limit > 50) limit = 50;

        const filter = { isDeleted: { $ne: true } };

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const [data, totalDocs] = await Promise.all([
            Puzzles.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate('createdBy', 'name email')
                .lean(),
            Puzzles.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(totalDocs / limit);

        const response = {
            docs: data,
            totalDocs,
            limit,
            page,
            totalPages,
            hasNext: page * limit < totalDocs,
            hasPrev: page > 1
        };

        res.status(httpStatus.OK).json(
            buildResponse(httpStatus.OK, response, 'Puzzles fetched successfully')
        );

    } catch (err) {
        handleError(res, err);
    }
};


export const getPuzzleByIdController = async (req, res) => {
    try {
        const validatedData = matchedData(req);

        const puzzle = await Puzzles.findOne({
            _id: validatedData.id,
            isDeleted: false
        }).populate('createdBy', 'name email');

        if (!puzzle) {
            throw buildErrorObject(httpStatus.NOT_FOUND, 'Puzzle not found');
        }

        res.status(httpStatus.OK).json(
            buildResponse(httpStatus.OK, puzzle, 'Puzzle fetched successfully')
        );

    } catch (err) {
        handleError(res, err);
    }
};


export const updatePuzzleController = async (req, res) => {
    try {
        const validatedData = matchedData(req);

        const puzzle = await Puzzles.findById(validatedData.id);

        if (!puzzle) {
            throw buildErrorObject(httpStatus.NOT_FOUND, 'Puzzle not found');
        }

        if (puzzle.isDeleted) {
            throw buildErrorObject(httpStatus.NOT_FOUND, 'Puzzle has been deleted');
        }

        if (validatedData.url && validatedData.url !== puzzle.url) {
            const existingPuzzle = await Puzzles.findOne({
                url: validatedData.url,
                isDeleted: false,
                _id: { $ne: validatedData.id }
            });

            if (existingPuzzle) {
                throw buildErrorObject(httpStatus.CONFLICT, 'Puzzle with same URL already exists');
            }
        }

        if (validatedData.name) puzzle.name = validatedData.name;
        if (validatedData.url) puzzle.url = validatedData.url;

        await puzzle.save();

        res.status(httpStatus.OK).json(
            buildResponse(httpStatus.OK, puzzle, 'Puzzle updated successfully')
        );

    } catch (err) {
        handleError(res, err);
    }
};


export const deletePuzzleController = async (req, res) => {
    try {
        const validatedData = matchedData(req);

        const puzzle = await Puzzles.findById(validatedData.id);

        if (!puzzle) {
            throw buildErrorObject(httpStatus.NOT_FOUND, 'Puzzle not found');
        }

        if (puzzle.isDeleted) {
            throw buildErrorObject(httpStatus.NOT_FOUND, 'Puzzle already deleted');
        }

        puzzle.isDeleted = true;
        await puzzle.save();

        res.status(httpStatus.OK).json(
            buildResponse(httpStatus.OK, 'Puzzle deleted successfully')
        );

    } catch (err) {
        handleError(res, err);
    }
};