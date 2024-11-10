export function toDataDisplay(value)
{
    const data = new Date(value);

    
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexado, então adicionamos 1
    const ano = data.getFullYear();

    // Monta a data no formato desejado
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
}