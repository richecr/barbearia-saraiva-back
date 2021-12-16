module.exports = (plop) => {
    plop.setGenerator('crud', {
        description: 'Cria os arquivos básicos para gerar o CRUD',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Qual é o nome do módulo? (Ex.: Project)',
            },
        ],
        actions: [
            {
                type: 'add',
                path: '../src/app/models/{{pascalCase (getName name)}}.ts',
                templateFile: 'templates/Model.ts.hbs',
            },
            {
                type: 'add',
                path: '../src/app/repository/{{pascalCase (getName name)}}Repository.ts',
                templateFile: 'templates/Repository.ts.hbs',
            },
            {
                type: 'add',
                path: '../src/app/services/{{pascalCase (getName name)}}Service.ts',
                templateFile: 'templates/Service.ts.hbs',
            },
            {
                type: 'add',
                path: '../src/app/controllers/{{pascalCase (getName name)}}Controller.ts',
                templateFile: 'templates/Controller.ts.hbs',
            },
            {
                type: 'add',
                path: '../src/app/dto/{{pascalCase (getName name)}}DTO.ts',
                templateFile: 'templates/DTO.ts.hbs',
            },
            {
                type: 'add',
                path: '../src/routes/{{camelCase (getName name)}}.ts',
                templateFile: 'templates/Routes.ts.hbs',
            },
        ],
    });

    plop.setHelper('getPath', (namePath) => {
        let path = '/';
        const directories = namePath.split('/');

        if (directories.length > 1) {
            directories.pop();
            path += directories.join('/');
        }

        return path;
    });

    plop.setHelper('getName', (namePath) => namePath.split('/').pop());
};
