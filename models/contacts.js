const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model('contact', schema);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact,
  contactSchema,
  contactFavoriteSchema,
};
