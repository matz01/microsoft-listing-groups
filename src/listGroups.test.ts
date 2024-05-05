import * as getGroupsFromApiModule from "./getGroupsFromApi";
import { listGroups } from "./listGroups";
jest.mock('@azure/identity', () => {
  return {
    ClientSecretCredential: jest.fn().mockImplementation(() => {
      return {
        getToken: jest.fn().mockResolvedValue({
          token: 'mocked-token',
          expiresOnTimestamp: Date.now() + 3600 * 1000, // a future timestamp
        }),
      };
    }),
  };
});


describe("listGroups", () => {
  it("should handle an error", async () => {
    jest
      .spyOn(getGroupsFromApiModule, "getGroupsFromApi")
      .mockImplementation(() => Promise.reject(new Error('123')));
    await expect(listGroups()).rejects.toThrow('123');
  });
});
