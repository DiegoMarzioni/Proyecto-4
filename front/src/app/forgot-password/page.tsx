export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-2">Recuperar Contraseña</h1>
          <p className="text-gray-400">Te enviaremos un enlace para restablecer tu contraseña</p>
        </div>

        
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl">
          <form className="space-y-6">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="tu@email.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ingresa el email asociado a tu cuenta
              </p>
            </div>

            
            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-600/25"
            >
              Enviar Enlace de Recuperación
            </button>
          </form>

          
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-gray-300">
                <p className="font-medium mb-1">¿No recibes el email?</p>
                <p>Revisa tu carpeta de spam o correo no deseado. El enlace será válido por 24 horas.</p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="text-center mt-6">
          <p className="text-gray-400">
            ¿Recordaste tu contraseña?{' '}
            <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
              Volver al inicio de sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
