# Cadastro de Carro
**Requisitos Funcionais => RF**

Deve ser possível cadastar um novo carro.


**Regra de Negócio => RN**

Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro.
O carro deve ser cadastrado por padrão com disponiblidade.
Somente um usuario admin possa cadastrar um carro.

# Listagem de Carros 

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possivel listar todos os carros disponíveis pelo nome da categoria.
Deve ser possivel listar todos os carros disponíveis pelo nome da marca.
Deve ser possivel listar todos os carros disponíveis pelo nome do carro.

**RN**

O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações
Deve ser po´ssivel listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
Somente um usuario admin possa cadastrar uma Especificação no carro.

# Cadastro de Imagens do carro

**RF**

Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload de arquivos.

**RN**
o usuario deve poder cadastrar mais de um imagem para o mesmo carro.
o usuario responsável pelo cadastro deve ser um usuario administrador.


# Aluguel de Carro

**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duração minima de 24 horas
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario.
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro.



