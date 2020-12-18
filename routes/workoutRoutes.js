const router = require('express').Router()
const { Workout } = require('../models')

router.post('/workouts', (req, res) => {
  Workout.create({})
    .then(Workout => res.json(Workout))
    .catch(err => console.log(err))
})

router.put('/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { tasks: req.body } },
    { new: true, runValidators: true }
  )
    .then(Workout => res.json(Workout))
    .catch(err => console.log(err))
})

router.get('/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$tasks.duration'
        },
        totalWeights: {
          $sum: '$workouts.weights'
        },
        totalReps: {
          $sum: '$workout.reps'
        },
        totalSets: {
          $sum: '$workout.sets'
        }
      }
    }
  ])
    .then(workouts => res.json(workouts))
    .catch(err => console.log(err))
})

router.get('/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$tasks.duration'
        },
        totalWeights: {
          $sum: '$workouts.weights'
        },
        totalReps: {
          $sum: '$workout.reps'
        },
        totalSets: {
          $sum: '$workout.sets'
        }
      }
    }
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then(workouts => res.json(workouts))
    .catch(err => console.log(err))
})

router.delete('/workouts', (req, res) => {
  Workout.findByIdAndDelete(req.body.id)
    .then(() => res.json(true))
    .catch(err => console.log(err))
})

module.exports = router