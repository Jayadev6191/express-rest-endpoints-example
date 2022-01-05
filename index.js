const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  const content = fs.readFileSync(__dirname + '/' + 'get.json', 'utf8');
  res.send(content)
});

app.get('/totalexpenses', (req, res) => {
    let totalamount = 0;
    const content = JSON.parse(fs.readFileSync(__dirname + '/' + 'get.json', 'utf8'));
    content.expenses.forEach(element => {
        totalamount += element.amount;
    });

    res.send({amount: totalamount})
});

app.post('/addexpense', (req, res) => {
    let totalexpenses = 0;
    const content = JSON.parse(fs.readFileSync(__dirname + '/' + 'get.json', 'utf8'));
    const salary = parseInt(content.salary);
    content.expenses.forEach(element => {
        totalexpenses += parseInt(element.amount);
    });

    const remainingAmount = salary - totalexpenses;

    if(parseInt(req.body.amount) <= remainingAmount) {
        const id = content.expenses.length + 1;
        content.expenses.push({id, ...req.body})
        fs.writeFileSync(__dirname + '/' + 'get.json', JSON.stringify(content, null ,2));
        res.send(content)
    } else {
        res.send('not enough purchashing power!')
    }
})

app.patch('/savings', (req, res) => {
    let totalexpenses = 0;
    const content = JSON.parse(fs.readFileSync(__dirname + '/' + 'get.json', 'utf8'));
    const salary = parseInt(content.salary);
    content.expenses.forEach(element => {
        totalexpenses += parseInt(element.amount);
    });

    const remainingAmount = parseInt(salary - totalexpenses);
    content.savings = remainingAmount;

    fs.writeFileSync(__dirname + '/' + 'get.json', JSON.stringify(content, null ,2));
    res.send(content)
})

app.get('/deleteExpense/:id', (req, res) => {
    const content = JSON.parse(fs.readFileSync(__dirname + '/' + 'get.json', 'utf8'));
    const filteredExpenses = content.expenses.filter(el => el.id !== parseInt(req.params.id));
    content.expenses = [...filteredExpenses]

    fs.writeFileSync(__dirname + '/' + 'get.json', JSON.stringify(content, null ,2));
    res.send(content)
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
