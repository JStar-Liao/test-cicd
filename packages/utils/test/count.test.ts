import { describe, expect, it } from "vitest"
import { count } from "../count"

describe("每三位数字加逗号", () => {
  it("应该是999,999,999", () => {
    expect(count(999999999)).toBe("999,999,999")
  })
})