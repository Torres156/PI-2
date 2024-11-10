export class User{
    Nome?: string
    Token?: string    

    static Has() 
    {
        const data = window.localStorage.getItem('user');

        return data !== undefined && data !== null;
    }

    static Set(data)
    {
        const json = JSON.stringify(data);
        window.localStorage.setItem('user', json);        
    }

    static Clear()
    {
        window.localStorage.removeItem('user');
    }

    static Get()
    {
        const json = window.localStorage.getItem('user');

        if (json == undefined || json === null)
            return undefined;

        return JSON.parse(json) as User;
    }
}