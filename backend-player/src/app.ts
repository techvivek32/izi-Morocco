import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import './db'
import { errorHandler } from './utils/err'

import authRoutes from './routes/auth'
import playerRoutes from './routes/player'
import gamesRoutes from './routes/games'
import results from './routes/results'

const port = process.env.PORT || '3000'

const app = express()

//middlerware
app.set('trust proxy', true)
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cors())
app.use(morgan('dev'))

//Setups Routes
app.get('/', (req, res) => {
  res.send('Server is up and running!')
})

app.use('/auth', authRoutes)
app.use('/player', playerRoutes)
app.use('/games', gamesRoutes)
app.use('/result', results)

app.use(errorHandler)

app.listen(port, () => {
  console.log('server started on port:', port)
})
