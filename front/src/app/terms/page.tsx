import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white mb-4">Términos y Condiciones</h1>
          <p className="text-gray-400">Última actualización: Agosto 2025</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Aceptación de Términos</h2>
                <p>
                  Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos de servicio, 
                  todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de 
                  cualquier ley local aplicable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Uso de la Licencia</h2>
                <p className="mb-4">
                  Se concede permiso para descargar temporalmente una copia de los materiales en el sitio web 
                  únicamente para visualización transitoria personal y no comercial.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modificar o copiar los materiales</li>
                  <li>Usar los materiales para cualquier propósito comercial o para exhibición pública</li>
                  <li>Intentar descompilar o realizar ingeniería inversa de cualquier software</li>
                  <li>Eliminar cualquier derecho de autor u otras notaciones de propiedad</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Descargo de Responsabilidad</h2>
                <p>
                  Los materiales en el sitio web se proporcionan &ldquo;tal como están&rdquo;. No ofrecemos garantías, 
                  expresas o implícitas, y por la presente rechazamos y anulamos todas las demás garantías, 
                  incluidas, sin limitación, las garantías implícitas o condiciones de comerciabilidad, 
                  idoneidad para un propósito particular o no infracción de propiedad intelectual.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Limitaciones</h2>
                <p>
                  En ningún caso la empresa o sus proveedores serán responsables de cualquier daño 
                  (incluidos, sin limitación, los daños por pérdida de datos o ganancias, o debido a 
                  la interrupción del negocio) que surjan del uso o la incapacidad de usar los materiales 
                  en el sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Política de Devoluciones</h2>
                <p className="mb-4">Aceptamos devoluciones bajo las siguientes condiciones:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Los artículos deben devolverse dentro de 30 días de la compra</li>
                  <li>Los productos deben estar en condición original, sin usar y con etiquetas</li>
                  <li>Se requiere recibo de compra o prueba de compra</li>
                  <li>Los artículos personalizados no son elegibles para devolución</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Privacidad</h2>
                <p>
                  Su privacidad es importante para nosotros. Consulte nuestra Política de Privacidad, 
                  que también rige su uso del sitio, para comprender nuestras prácticas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Modificaciones</h2>
                <p>
                  Podemos revisar estos términos de servicio para su sitio web en cualquier momento 
                  sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión 
                  actual de estos términos de servicio.
                </p>
              </section>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-block bg-yellow-600 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
