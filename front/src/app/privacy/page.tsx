import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white mb-4">Política de Privacidad</h1>
          <p className="text-gray-400">Última actualización: Agosto 2025</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Información que Recopilamos</h2>
                <p className="mb-4">Recopilamos información que usted nos proporciona directamente, como cuando:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Crea una cuenta o se registra para nuestros servicios</li>
                  <li>Realiza una compra o transacción</li>
                  <li>Se suscribe a nuestro boletín informativo</li>
                  <li>Se comunica con nuestro servicio al cliente</li>
                  <li>Participa en encuestas o promociones</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Cómo Utilizamos su Información</h2>
                <p className="mb-4">Utilizamos la información recopilada para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Procesar y completar sus transacciones</li>
                  <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                  <li>Enviar confirmaciones de pedidos y actualizaciones de estado</li>
                  <li>Responder a sus comentarios, preguntas y solicitudes</li>
                  <li>Enviar comunicaciones promocionales (con su consentimiento)</li>
                  <li>Proteger contra actividades fraudulentas o ilegales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Compartir Información</h2>
                <p className="mb-4">No vendemos, comercializamos ni transferimos su información personal a terceros, excepto:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Con proveedores de servicios que nos ayudan a operar nuestro sitio web</li>
                  <li>Para cumplir con la ley o proteger nuestros derechos</li>
                  <li>En caso de fusión, adquisición o venta de activos</li>
                  <li>Con su consentimiento explícito</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Seguridad de Datos</h2>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
                  su información personal contra acceso no autorizado, alteración, divulgación o destrucción. 
                  Sin embargo, ningún método de transmisión por Internet es 100% seguro.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies</h2>
                <p className="mb-4">
                  Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
                  <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo usa el sitio</li>
                  <li><strong>Cookies de marketing:</strong> Para mostrar anuncios relevantes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Sus Derechos</h2>
                <p className="mb-4">Usted tiene derecho a:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acceder a la información personal que tenemos sobre usted</li>
                  <li>Solicitar la corrección de información inexacta</li>
                  <li>Solicitar la eliminación de su información personal</li>
                  <li>Oponerse al procesamiento de su información</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                  <li>Portabilidad de datos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Retención de Datos</h2>
                <p>
                  Conservamos su información personal solo durante el tiempo necesario para cumplir con 
                  los propósitos descritos en esta política, a menos que la ley requiera o permita un 
                  período de retención más largo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Contacto</h2>
                <p className="mb-4">
                  Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email: privacy@fashionstore.com</li>
                  <li>Teléfono: +1 (555) 123-4567</li>
                  <li>Dirección: 123 Fashion Street, City, State 12345</li>
                </ul>
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
