const request = require("supertest");
const http = require("http");

const { app } = require("../index");
const { getAllEmployees } = require("../controllers");

jest.mock("../controllers/index.js", () => ({
    ...jest.requireActual("../controllers/index.js"),
    getAllEmployees: jest.fn()
}));

let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll(() => {
    server.close(done)
});


describe("Controller Function tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all employees", () => {
        let mockEmployees = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },
        ];
        getAllEmployees.mockReturnValue(mockEmployees);

        const employees = getAllEmployees();
        expect(employees).toEqual(mockEmployees);
        expect(employees.length).toEqual(3);
    })
});

describe("API Endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("GET /employees should get all employees", async () => {
        const mockEmployees = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            }
        ];
        const res = await request(server).get("/employees");
        expect(res.statusCode).toBe(200);
        expect(res.body.employees.length).toBe(3);
        expect(res.body.employees).toEqual(mockEmployees);
    });

    it("GET /employees/details/:id should get employee with matching id", async () => {
        const mockEmployee = {
            employeeId: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            departmentId: 1,
            roleId: 1,
        };
        const resp = await request(server).get("/employees/details/1");
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({ employee: mockEmployee })
    });
});