import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import app from '../src/index'; // アプリケーションのインスタンスをインポートする必要があります

describe("test", () => {
  it("always succeed", () => {
    expect(true).toBe(true);
  });
});

describe('GET /users のテスト', () => {
  it('DBが空の場合は空のリストを返す', async () => {
		// arrange
		// 元々入っているデータを消す
		await prisma.user.deleteMany();

		const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ users: [] });
    // 必要に応じてさらに多くの検証を追加できます
  });

	it('DBにuserが含まれている場合はその一覧を返す', async () => {
		// arrange
		// 元々入っているデータを消す
		await prisma.user.deleteMany();

		await prisma.user.create({
			data: {
				name: 'taro',
				email: 'taro@example.com',
			},
		});

		// act
		const response = await request(app).get('/users');

		// assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ users: [{
			id: expect.any(Number),
			name: 'taro',
			email: 'taro@example.com'
		}] });
    // 必要に応じてさらに多くの検証を追加できます
  });


});