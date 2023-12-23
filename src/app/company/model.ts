import mongoose from "mongoose";

const companySchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
        indexes: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },

    description: {
      type: String,
      max: [512, "Description is too long"],
      min: [10, "Description is too short"],
    },

    logo: {
      type: String,
    },

    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please fill a valid url",
      ],
    },

    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      enum: {
        values: [
          "Web Development",
          "Mobile Development",
          "UI/UX",
          "Data Science",
          "DevOps",
          "QA",
          "Business Intelligence",
          "AI",
          "Engineering",
          "Product Management",
          "Product",
          "Ecommerce",
          "Digital Marketing",
          "Cyber Security",
          "HR",
          "Others",
        ],
        message: "{VALUE} is not supported",
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "deleted", "suspended"],
      default: "active",
    },

    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Account id is required"],
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
