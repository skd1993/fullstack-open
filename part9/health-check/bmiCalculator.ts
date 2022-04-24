export function calculatBmi(weight: number, height: number): string {
  const bmi = +(weight / (height * height)).toFixed(2);
  if (bmi < 18.5)
    return `${bmi} Underweight`;
  else if (bmi >= 18.5 && bmi < 24.9)
    return `${bmi} Normal`;
  else if (bmi >= 25 && bmi < 29.9)
    return `${bmi} Overweight`;
  else
    return `${bmi} Obese`;
}

// const weight: number = +process.argv[2]
// const height: number = +process.argv[3]

// console.log(`BMI is: `, calculatBmi(weight, height));