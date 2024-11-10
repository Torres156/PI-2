import { useState } from "react";

export function OnlyNumbers (event) {
  event.target.value = event.target.value.replace(/\D/, "")
}

export function OnlyDate(e){
  let input = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    if (input.length > 5) {
      input = input.slice(0, 5) + '/' + input.slice(5, 9);
    }
    e.target.value = input;
}

export function OnlyPhone(e)
{
  let input = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    if (input.length > 0) {
      input = '(' + input;
    }
    if (input.length > 3) {
      input = input.slice(0, 3) + ') ' + input.slice(3);
    }
    if (input.length > 10) {
      input = input.slice(0, 10) + '-' + input.slice(10, 15);
    }
    if (input.length > 15) {
      input = input.slice(0, 15); // Limita ao formato (XX) XXXXX-XXXX
    }

    e.target.value = input;
}

export function ImageTo(ev, elementId)
{
  if (ev.target.files && ev.target.files[0])  
  {
    const img = ev.target.files[0]
    const element = document.getElementById(elementId)
    if (element)
      element.style.backgroundImage = `url(${URL.createObjectURL(img)})`
  }
}

// const inputsImage = document.querySelectorAll('input[type=file][data-input-photo]');
// if (inputsImage)
// inputsImage.forEach(input => {
// 	input.addEventListener('change', (ev) =>{
// 		if (ev.target.files && ev.target.files[0])
// 		{
// 			const img = ev.target.files[0];
// 			const elementID = ev.target.getAttribute("data-input-photo");
// 			const elementImage = document.getElementById(elementID);
			
// 			if (elementImage)			
// 				elementImage.style.backgroundImage = "url(" + URL.createObjectURL(img) + ")";
// 		}
// 	})
// });

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeWithKey = (e, key) => {        
    const { value } = e.target;
    
    setValues(prevValues => ({
      ...prevValues,
      [key]: value,
    }));
  };


  return [values, setValues, handleChange, handleChangeWithKey];
}


