import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { matchedData } from 'express-validator';
import Player from '../models/players.schema.js';
import buildErrorObject from '../utils/buildErrorObject.js';
import { generateUUID } from '../utils/uuid.js';
import handleError from '../utils/handleError.js';
import buildResponse from '../utils/buildResponse.js';

export const listDropdownController = async (req, res) => {
    try {
        const players = await Player.find({ isDeleted: { $ne: true }, role: { $eq: 'A' } }, { playerId: 1, name: 1 })
            .sort({ name: 1 })
            .lean();

        res
            .status(httpStatus.OK)
            .json(
                buildResponse(httpStatus.OK, players, 'Players retrieved successfully')
            );
    } catch (err) {
        handleError(res, err);
    }
};

export const createPlayerForAdmins = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const { email, password, name } = validatedData;

        const existingPlayer = await Player.findOne({ email: email.toLowerCase() });
        if (existingPlayer) {
            throw buildErrorObject(httpStatus.CONFLICT, 'Player with same email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const playerId = generateUUID()

        const playerDetails = {
            playerId,
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            isVerified: true, // Will be true after email verification but true for admins
            role: "A"
        }

        const playerCreated = await Player.create(playerDetails)

        if (!playerCreated) {
            throw buildErrorObject(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create player');
        }
        res.status(httpStatus.CREATED).json({ message: 'Player created successfully' });
    }
    catch (err) {
        handleError(res, err);
    }
}

export const getAllPlayersForAdmins = async (req, res) => {
    try {
        let { page = 1, limit = 50, search = '' } = matchedData(req);
        page = Number(page) || 1;
        limit = Number(limit) || 50;
        if (limit > 50) limit = 50;
        const filter = { isDeleted: { $ne: true }, role: { $eq: 'A' } };

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        const [data, totalDocs] = await Promise.all([
            Player.find(filter, { password: 0, isVerified: 0, role: 0, createdAt: 0, updatedAt: 0 })
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean(),
            Player.countDocuments(filter)
        ]);
        const totalPages = Math.ceil(totalDocs / limit);

        const response = {
            page,
            limit,
            totalDocs,
            totalPages,
            data
        };
        res.status(httpStatus.OK).json({ response, message: 'Players fetched successfully' });
    }
    catch (err) {
        handleError(res, err);
    }
}