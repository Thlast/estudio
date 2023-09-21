import { CargarLiquidaciones } from "../liquidaciones/cargarLiquidaciones"

export const Ejercicios = ({obtenerLiquidacion}) => {

    return (
        <>
        Ver Resolución <CargarLiquidaciones obtenerLiquidacion={obtenerLiquidacion} />
            <h1>Caso I: Declaración de Impuestos para el período fiscal 2020</h1>

            <p>Se pide determinar el impuesto a ingresar para el período fiscal 2020 de Julio La Torre, argentino, de profesión contador, casado con Paula Negro, de profesión médica, quien percibió honorarios por $700.000, con quien tiene dos hijos:</p>

            <ul>
                <li>Juan de 22 años, estudiante de abogacía, no trabaja</li>
                <li>Melisa de 15 años, estudiante de secundario.</li>
            </ul>

            <p>En cuanto a la deducibilidad de las cargas de sus hijos, ambos padres decidieron que se efectuaran 50% cada uno.</p>

            <h2>Ingresos y Gastos:</h2>

            <ol>
                <li>
                    <p>Posee un Departamento en la Calle 13 N° 723, 2° Piso que adquirió en $200.000 en febrero de 2004, cuya valuación fiscal al momento de compra era de 80% el edificio y 20% el terreno.</p>
                    <p>Se encuentra afectado a alquiler desde la fecha de adquisición, el 1/1/2020 vuelve a pactar un nuevo contrato de alquiler por 2 años, en $10.000 por mes, el alquiler correspondiente al mes de diciembre se encuentra impago.</p>
                    <p>El inquilino tiene a su cargo el impuesto inmobiliario, por el que abonó $3.350, en forma bimestral y el impuesto municipal $1.100 por mes, adeudando el mes de diciembre del impuesto municipal que vencía en enero de 2021.</p>
                    <p>El inquilino reparó en mayo de 2020 una gotera por $3.000 que compensó con el alquiler.</p>
                    <p>Las expensas del año 2020 fueron de $50.000 y según contrato de locación están a cargo del inquilino.</p>
                    <p>Los gastos de mantenimiento ascendieron del 2020 ascendieron a $22.000, el contribuyente optó en 2018 deducir gastos de mantenimiento presuntos.</p>
                    <p>El propietario contrató una póliza de seguro contra incendio del inmueble con un costo de $1.200 mensuales.</p>
                </li>
                <li>
                    <p>Hasta el 31/12/2020, seguía ocupado el inmueble que cedió gratuitamente a su hijo el 20/3/2019 en la calle 25. Se devengaron en el año $10.000 correspondientes al Impuesto municipal (ABL) e inmobiliario, $30.000 de expensas a cargo del contribuyente y gastos de luz, gas y teléfono por $25.000 a cargo de su hijo.</p>
                    <p>El inmueble fue adquirido el 16/11/2003 en $120.000, cuya valuación al momento de adquisición era de 70% al edificio y 30% al terreno. El valor locativo presunto del inmueble para el 2020 es de $95.000</p>
                </li>
                <li>
                    <p>En marzo heredó un departamento en la calle 7, cuyo valor de plaza ascendía a $1.200.000, que su padre había adquirido el 1/2/2019, desconociendo el valor de adquisición, se encontraba desocupado desde que lo heredó.</p>
                </li>
                <li>
                    <p>Percibió honorarios por su trabajo en el exterior por $50.000 y por su desempeño en el estudio contable por $900.000. Realizó gastos en el estudio por $90.000, sueldos $100.000, compró revistas relacionadas a su profesión por $15.000 y el seguro contra incendio de la casa habitación por $15.000.</p>
                    <p>Asimismo, percibió en concepto de sueldo la suma de $570.000 del que le retuvieron por el impuesto a las ganancias $29.000, y en concepto de viáticos y movilidad $40.000.</p>
                </li>
            </ol>

            <h2>Otros Ingresos y Egresos:</h2>

            <ul>
                <li>Como renta neta proveniente de la enajenación de obligaciones negociables en moneda nacional (no colocadas por oferta pública) obtuvo $20.000.</li>
                <li>Además, percibió $3.000 de intereses de su caja de Ahorro en el Banco Francés sucursal 47.</li>
                <li>Al 31 de diciembre quedó un saldo en cuenta de $35.000 y dinero en efectivo por $14.000.</li>
                <li>El 2/11/2020 vende el departamento de la calle 7, que había heredado en marzo en $1.500.000. La variación del índice de precios entre la fecha de adquisición y la de transferencia es del 10%. Las comisiones y gastos abonados por la venta de inmueble a cargo de Julio ascendieron a $100.000.</li>
                <li>Asimismo, en diciembre heredó un Auto Honda Civic 2015 $400.000.</li>
                <li>Abonó a la Caja de Profesionales en Ciencias Económica de la Provincia de Buenos Aires por el ejercicio de su profesión independiente $43.224.</li>
                <li>Abonó por el fallecimiento de su padre $20.000 correspondientes a los gastos de sepelio.</li>
                <li>Abonó la cuota médico asistencial $120.000, correspondiendo $30.000 a cada miembro familiar.</li>
            </ul>

            <h1>Caso II: Determinación de Patrimonio, Consumo y Anticipos para el período 2021</h1>

            <p>El Patrimonio al 31/12/2019 es el siguiente:</p>

            <ul>
                <li>Casa Habitación calle 14: $40.000</li>
                <li>Departamento calle 25: $120.000</li>
                <li>Departamento en la Calle 13 N° 723: $200.000</li>
                <li>Dinero en efectivo: $80.000</li>
                <li>Obligaciones negociables: $20.000</li>
            </ul>

            <p>Total Patrimonio: $460.000</p>
        </>
    )
}