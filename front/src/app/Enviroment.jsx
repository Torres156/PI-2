export const EnviromentTypes = {
    Local : 0,
    Production : 1,
}

export const EnviromentType = EnviromentTypes.Local;

export function GetApi()
{
    switch (EnviromentType)
    {
        default:
        case EnviromentTypes.Local:
            return 'http://integrador2.test/';

        case EnviromentTypes.Production:
            return 'https://177.152.98.197:44378/';
    }
}