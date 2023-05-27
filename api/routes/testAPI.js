// // i used xampp


const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const sequelize = new Sequelize('mynew', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the form data model
const FormData = sequelize.define('FormData', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkboxValues: {
    type: DataTypes.TEXT,
  },
  radioValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


sequelize.sync().then(() => {
  console.log('Table created or already exists');
}).catch((error) => {
  console.error('Error syncing the model with the database:', error);
});

// Define the form data API routes
const formRouter = express.Router();

// Create a new form entry
formRouter.post('/', async (req, res) => {
  const { name, email, phoneNumber, checkboxValues, radioValue } = req.body;

  try {
    // Insert the form data into the database
    const formData = await FormData.create({
      name,
      email,
      phoneNumber,
      checkboxValues: JSON.stringify(checkboxValues),
      radioValue,
    });
    
    console.log('Form data inserted successfully:', formData.toJSON());
    res.status(200).json({ message: 'Form data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).json({ message: 'Error storing form data. Please try again later.' });
  }
});


formRouter.get('/', async (req, res) => {
  try {
   
    const formData = await FormData.findAll();
    
    res.status(200).json(formData);
  } catch (error) {
    console.error('Error retrieving form data:', error);
    res.status(500).json({ message: 'Error retrieving form data. Please try again later.' });
  }
});


app.use('/testAPI', formRouter);

module.exports=formRouter;
