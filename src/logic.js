export function generateData(population) {
    const baseBirthRate = 0.000015;
    const baseDeathRate = 0.000008;
    const totalPopulation = Math.max(population, 0);
    const birthRate = (baseBirthRate * totalPopulation) / 10;
    const deathRate = (baseDeathRate * totalPopulation) / 10;
    const medianAge = Math.floor(18 + (totalPopulation / 100000) * 2);
    const lifeExpectancy = Math.floor(70 + (totalPopulation / 100000) * 1);
    const youthDependencyRatio = Math.max(0, 40 - (totalPopulation / 100000));
    const oldAgeDependencyRatio = Math.min(100, 20 + (totalPopulation / 100000));
    const populationGrowthRate = ((birthRate - deathRate) / totalPopulation) * 100;
    const netMigrationRate = 0.5;
    const sexRatio = Math.floor(98 + (Math.random() > 0.5 ? 1 : -1));
    const year = 1

    console.log(population)
    return {
        year,
        totalPopulation,
        birthRate,
        deathRate,
        medianAge,
        lifeExpectancy,
        youthDependencyRatio,
        oldAgeDependencyRatio,
        populationGrowthRate,
        netMigrationRate,
        sexRatio
    };
}

export function addYears(oldData, numberOfYearsAdded) {
    const newData = { ...oldData };

    for (let time = 0; time < numberOfYearsAdded; time++) {
        const year = newData.year++
        const births = (newData.birthRate / 100) * newData.totalPopulation;
        const deaths = (newData.deathRate / 100) * newData.totalPopulation;
        const netMigration = (newData.netMigrationRate / 100) * newData.totalPopulation;

        newData.totalPopulation += births - deaths + netMigration;
        newData.totalPopulation = Math.max(newData.totalPopulation, 0);
        newData.medianAge += 1;

        if (newData.lifeExpectancy > newData.medianAge) {
            newData.lifeExpectancy += 0.1;
        }

        newData.youthDependencyRatio = Math.max(0, newData.youthDependencyRatio - 0.1);
        newData.oldAgeDependencyRatio = Math.min(100, newData.oldAgeDependencyRatio + 0.1);
        newData.sexRatio = Math.max(0, newData.sexRatio + (Math.random() > 0.5 ? 0.1 : -0.1));
        newData.populationGrowthRate = ((births - deaths + netMigration) / newData.totalPopulation) * 100;
    }

    return newData;
}


const boyNames = [
    "Liam",
    "Noah",
    "Oliver",
    "Elijah",
    "James",
    "William",
    "Benjamin",
    "Lucas",
    "Henry",
    "Alexander",
    "Jackson",
    "Sebastian",
    "Mateo",
    "David",
    "Joseph",
    "Carter",
    "Owen",
    "Wyatt",
    "John",
    "Jack",
    "Luke",
    "Gabriel",
    "Isaac",
    "Jayden",
    "Anthony",
    "Dylan",
    "Leo",
    "Lincoln",
    "Asher",
    "Christopher",
    "Maverick"
];

const girlNames = [
    "Olivia",
    "Emma",
    "Ava",
    "Sophia",
    "Isabella",
    "Mia",
    "Amelia",
    "Harper",
    "Evelyn",
    "Abigail",
    "Ella",
    "Scarlett",
    "Grace",
    "Chloe",
    "Aria",
    "Sofia",
    "Madison",
    "Layla",
    "Lily",
    "Nora",
    "Riley",
    "Zoey",
    "Mila",
    "Hannah",
    "Addison",
    "Avery",
    "Ellie",
    "Stella",
    "Natalie",
    "Lucy",
    "Paisley"
];


export function generateList(numberOfPeople) {
    let generatedList = []

    for (let i = 0; i < numberOfPeople; i++) {
        generatedList.push(addHuman())
    }

    return generatedList
}

function addHuman() {
    let gender = Math.round(Math.random());
    let imgIndex = Math.floor(Math.random() * 5) + 1;
    let age = Math.floor(Math.random() * 80) + 2

    const currentImg = Math.min(
        age <= 4 ? 1 :
            age <= 16 ? 2 :
                age <= 30 ? 3 :
                    age <= 65 ? 4 : 5
    );


    if (gender == 1) {
        return {
            imgIndex: imgIndex,
            imgSrc: "./people/male" + imgIndex + "/" + currentImg + ".jpg",
            name: boyNames[Math.floor(Math.random() * boyNames.length)],
            gender: "Male",
            age: age,
        }
    } else {
        return {
            imgIndex: imgIndex,
            imgSrc: "./people/female" + imgIndex + "/" + currentImg + ".jpg",
            name: girlNames[Math.floor(Math.random() * girlNames.length)],
            gender: "Female",
            age: Math.floor(Math.random() * 80) + 2,
        }
    }
}

export function adjustList(list, years) {
    console.log(list[0])

    for (let i = 0; i < list.length; i++) {
        list[i].age += years
        if (list[i].age >= 90) list[i] = addHuman()

        let currentImg = Math.min(
            list[i].age <= 4 ? 1 :
                list[i].age <= 16 ? 2 :
                    list[i].age <= 30 ? 3 :
                        list[i].age <= 65 ? 4 : 5
        );

        if (list[i].gender == "Male") {
            list[i].imgSrc = "./people/male" + list[i].imgIndex + "/" + currentImg + ".jpg"
        } else {
            list[i].imgSrc = "./people/female" + list[i].imgIndex + "/" + currentImg + ".jpg"
        }
    }

    console.log(list[0])

    return list

}