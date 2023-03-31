'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const database_1 = require('./connection/database')
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const server = (0, express_1.default)()
const PORT = process.env.PORT
server.use(express_1.default.json())
server.use(express_1.default.urlencoded({ extended: true }))
server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Quad-Fold\n Best deals with the best prices',
    })
    console.log('BOOM 🔥🔥')
})
server.listen(PORT, () =>
    __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Quad server is listening at http://localhost:${PORT}`)
        yield (0, database_1.connectDB)()
        database_1.sequelize.sync({ force: false }).then(() => {
            console.log('✅Synced database successfully...')
        })
    })
)
exports.default = server
