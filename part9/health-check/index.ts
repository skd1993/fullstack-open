import express from 'express'
const app = express()

import { calculatBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises } = req.body
    const target = +req.body.target
    if (isNaN(target) || target <= 0 || !daily_exercises || !target || daily_exercises.length === 0) {
      throw new Error('malformatted paramters')
    }
    const ex = calculateExercises(daily_exercises, target)
    res.status(200).json(ex)
  }
  catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.get('/bmi', (req, res) => {
  try {
    if (req.query.height && req.query.weight) {
      const { height, weight } = req.query
      if (isNaN(+weight) || isNaN(+height) || +height === 0) {
        throw new Error('malformatted paramters given')
      }
      const height_m = (+height / 100)
      const bmi = calculatBmi(+weight, +height_m)
      res.status(200).json({ height, weight, bmi })
    }
    else {
      throw new Error('height or weight not given, check parameters')
    }
  }
  catch (err) {
    res.status(400).json({ error: err.message })
  }
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})