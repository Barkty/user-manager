import { model, Schema } from "mongoose";
import paginator from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const schema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: false, unique: true, trim: true },
        password: { type: String, required: true, minLength: 8 },
        levelOne: { type: Schema.Types.ObjectId, ref: "Worker", required: true, default: function () {return this.id} },
        levelTwo: { type: Schema.Types.ObjectId, ref: "Worker"},
        levelThree: { type: Schema.Types.ObjectId, ref: "Worker" },
        supervisor: { type: Schema.Types.ObjectId, ref: "Worker" },
        street: { type: String },
        location: { type: String },
        isSuperCommissionApproved: { type: Boolean },
        iban: { type: Number }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

schema.plugin(paginator);
schema.plugin(mongooseAggregatePaginate);
export default model("Worker", schema);