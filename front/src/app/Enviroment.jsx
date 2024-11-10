export const EnviromentTypes = {
    Local : 0,
    Production : 1,
}

export const EnviromentType = EnviromentTypes.Production;

export function GetApi()
{
    switch (EnviromentType)
    {
        default:
        case EnviromentTypes.Local:
            return 'http://integrador2.test/';

        case EnviromentTypes.Production:
            return 'https://integradorapi.vercel.app/';
    }
}