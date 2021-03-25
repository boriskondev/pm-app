const responsible = [
    {id: 1, name: "Боби"},
    {id: 2, name: "Веско"},
    {id: 3, name: "Данчо"},
    {id: 4, name: "Диляна"},
    {id: 5, name: "Катя"},
    {id: 6, name: "Крис"},
    {id: 7, name: "Марто"},
    {id: 8, name: "Милена"},
    {id: 9, name: "Соня"},
    {id: 10, name: "Стефи"},
    {id: 11, name: "Хилда"},
    {id: 12, name: "Ивел"},
    {id: 13, name: "Хамуд"},
    {id: 14, name: "Герда"},
    {id: 15, name: "Костил"},
    {id: 16, name: "Хибрид"},
]

let filtered = responsible.filter(obj => obj.name);

console.log(filtered)