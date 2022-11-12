import { createServer } from "@graphql-yoga/node"

const usuarios = [
    {
        id:'100',
        nome:'José',
        livros:[
            {
                id:'1',
                titulo:'Effective Java',
                genero:'Técnico',
                edicao:3,
                preco:39.99
            },
            {
                id:'2',
                titulo:'Concrete Mathematics',
                genero:'Técnico',
                edicao:1,
                preco:89.99
            }
        ]
    },
    {
        id:'101',
        nome:'Maria',
        livros:[
            {
                id:'5',
                titulo:'Programming Challenges',
                genero:'Técnico',
                edicao:1,
                preco:39.99
            }
        ]
    }
]
const livros=[
    {
        id:'1',
        titulo:'Effective Java',
        genero:'Técnico',
        edicao:3,
        preco:39.99
    },
    {
        id:'2',
        titulo:'Concrete Mathematics',
        genero:'Técnico',
        edicao:1,
        preco:89.99
    }
]

const typeDefs = `
    type Query {
        usuarios:[Usuario!]!
        livros(precoMaximo: Float!): [Livro!]!
        adicionar(numeros:[Float!]):Float!
        notas: [Int!]!
        bemVindo(nome: String): String!
        effectiveJava: Livro!
    },
    type Usuario {
        id: ID!,
        nome: String!,
        idade: Int!,
        livros: [Livro!]
    },
    type Livro {
        id: ID!
        titulo: String!
        genero: String!
        edicao: Int
        preco: Float
    }
`;

const resolvers = {
    Query: {
        usuarios(){
            return usuarios;
        },
        livros(parent, args, ctx, info){
            return livros.filter((l) => {
                return l.preco <= args.precoMaximo
            });
        },
        adicionar(parent, args, ctx, info){
            return args.numeros.length === 0? 0 :
            args.numeros.reduce((ac,atual) => {
                return ac + atual;
            })
        },

        notas(parent, args, ctx, info) {
            return[10, 2, 7, 7, 8]
        },

        bemVindo(parent, args, ctx, info) {
            return `
                Bem vindo ${args.nome ? args.nome: 'visitante'}
                `;
        },

        effectiveJava() {
            return {
                id: '123456',
                titulo: 'Effective Java',
                genero: 'Técnico',
                edicao: 3,
                preco: 43.9
            }
        }
    },
};

const server = createServer({
    schema: {
        typeDefs,
        resolvers
    }
})

server.start(() => {
    'Servidor no ar...'
})

