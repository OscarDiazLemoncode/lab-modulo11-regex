import { tablaBancos } from './modelo';

export const obtenerValorInput = (): string => {
  const input = document.querySelector('#input_iban');
  if (input && input instanceof HTMLInputElement) {
    return input.value.toUpperCase().trim();
  }
  throw new Error('No se ha obtenido el valor del input');
};

export const habilitarBoton = () => {
  const comprobar = document.querySelector('#comprobar');
  if (comprobar && comprobar instanceof HTMLButtonElement) {
    comprobar.removeAttribute('disabled');
  }
};
export const deshabilitarBoton = () => {
  const comprobar = document.querySelector('#comprobar');
  if (comprobar && comprobar instanceof HTMLButtonElement) {
    comprobar.setAttribute('disabled', 'true');
  }
};

export const crearTitulo = (texto: string) => {
  const divInfo = document.querySelector('.info');
  const titulo = document.createElement('h2');
  if (divInfo && divInfo instanceof HTMLDivElement) {
    titulo.textContent = texto;
    divInfo.appendChild(titulo);
  }
};

export const limpiarInfo = () => {
  const divInfo = document.querySelector('.info');
  const input = document.querySelector('#input_iban');
  if (
    divInfo &&
    divInfo instanceof HTMLDivElement &&
    input &&
    input instanceof HTMLInputElement
  ) {
    input.value = '';
    divInfo.innerHTML = '';
  }
};

export const validarIbanBienFormado = (valor: string): boolean => {
  const patron =
    /^(?<pais>[A-Z]{2})(?<digitoControlPais>\d{2})(\s|-)?(?<entidad>\d{4})(\s|-)?(?<oficina>\d{4})(\s|-)?(?<digitoControl>\d{2})(\s|-)?(?<numeroCuenta>\d{10})$/gm;
  const ibanValido = patron.exec(valor);
  if (ibanValido) {
    const {
      pais,
      digitoControlPais,
      entidad,
      oficina,
      digitoControl,
      numeroCuenta,
    } = ibanValido.groups as any;

    crearTitulo(`El IBAN está bien formado`);
    crearTitulo(`El IBAN es válido`);
    crearTitulo(`PAÍS: ${pais}`);
    crearTitulo(`Dígito control país: ${digitoControlPais}`);
    crearTitulo(`Código sucursal: ${entidad}`);
    crearTitulo(`Código oficina: ${oficina}`);
    crearTitulo(`Dígito de control: ${digitoControl}`);
    crearTitulo(`Número de cuenta: ${numeroCuenta}`);
    deshabilitarBoton();
    return true;
  }
  crearTitulo('El IBAN no está bien formado');
  deshabilitarBoton();
  throw new Error('El IBAN no está bien formado');
  return false;
};

const obtenerCodigoBancoIban = (valor: string): string => {
  const patron =
    /^(?<pais>[A-Z]{2})(?<digitoControlPais>\d{2})(\s|-)?(?<entidad>\d{4})(\s|-)?(?<oficina>\d{4})(\s|-)?(?<digitoControl>\d{2})(\s|-)?(?<numeroCuenta>\d{10})$/gm;
  const ibanValido = patron.exec(valor);
  if (ibanValido) {
    const { entidad } = ibanValido.groups as any;
    return entidad;
  }
  throw new Error('No se ha obtenido el código del banco');
};

export const coincidenciaEnTablaBancos = (
  valor: string
): string | undefined => {
  const codigoBancoIban = obtenerCodigoBancoIban(valor);
  return tablaBancos.find((banco) => {
    if (banco.slice(0, 4).trim() === codigoBancoIban) {
      const nombreBanco = banco.slice(5);
      return crearTitulo(`Banco: ${nombreBanco}`);
    }
    return undefined;
  });
};

export const validarIbanBienFormadoParaTest = (valor: string): boolean => {
  const patron =
    /^(?<pais>[A-Z]{2})(?<digitoControlPais>\d{2})(\s|-)?(?<entidad>\d{4})(\s|-)?(?<oficina>\d{4})(\s|-)?(?<digitoControl>\d{2})(\s|-)?(?<numeroCuenta>\d{10})$/gm;
  if (patron.test(valor)) {
    return true;
  }
  return false;
};
