type weekArr = number[]

interface ResultObj {
  periodLength: number;
  trainingDays: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: "need improvement, don't give up" | "not too bad but could be better" | "excellent"
  target: number
}

function calculateTrainingDays(dailyExercise: weekArr): number {
  let count = 0;
  dailyExercise.forEach(t => {
    if (t > 0) count++;
  })
  return count;
}

export function calculateExercises(dailyExercise: weekArr, target: number = 2): ResultObj {
  const periodLength = dailyExercise.length
  const trainingDays = calculateTrainingDays(dailyExercise)
  const average = (dailyExercise.reduce((x, y) => x + y, 0)) / periodLength
  const success = average === target
  const metadata = { periodLength, trainingDays, average, success, target }
  if (average < 1) {
    return { ...metadata, rating: 1, ratingDescription: "need improvement, don't give up" }
  }
  else if (average > 1 && average < 2) {
    return { ...metadata, rating: 2, ratingDescription: "not too bad but could be better" }
  }
  else {
    return { ...metadata, rating: 3, ratingDescription: "excellent" }
  }
}

// const dailyExercise: weekArr = process.argv.slice(2).map(v => {
//   if (isNaN(+v)) { throw new Error('malformatted paramters') }
//   else { return +v }
// })
// console.log(calculateExercises(dailyExercise))