const clientsController = require('../../controllers/clientsController');

describe("Validação de cadastro de clientes", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("deve retornar erro se o nome for maior que 255 caracteres", async () => {
    const req = {
      body: {
        nome: "A".repeat(256),
        sobrenome: "",
        email: "",
        idade: ""
      }
    };

    await clientsController.createClient(req, res);

    expect(res.status).toHaveBeenCalledWith(500); // ou 400, conforme sua implementação
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        erro: expect.stringContaining("Nome do produto deve ter no máximo 100 caracteres")
      })
    );
  });
});

