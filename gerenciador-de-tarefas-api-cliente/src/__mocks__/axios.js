export default {
    get: jest.fn().mockRejectedValue({data: {}}),
    post: jest.fn().mockRejectedValue({data: {}}),
    put: jest.fn().mockRejectedValue({data: {}}),
    delete: jest.fn().mockRejectedValue({data: {}})
};