import React from 'react';
import { Heart, Mail, Globe, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">CP</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Calypso</h3>
                <p className="text-xs text-gray-400">Sports Streaming</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La aplicación definitiva para streaming deportivo profesional 
              desde tu dispositivo móvil. Completamente gratuita.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Características</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Streaming HD
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Gestión de Equipos
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Marcadores en Vivo
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Configuración RTMP
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Grabación Local
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Plataformas</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                YouTube Live
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Twitch
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Facebook Live
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Servidor RTMP Personalizado
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Soporte</h4>
            <div className="space-y-3">
              <a 
                href="mailto:support@calypso.app" 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Mail size={16} />
                <span>support@calypso.app</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Globe size={16} />
                <span>calypso.app/help</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Shield size={16} />
                <span>Política de Privacidad</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Calypso Sports Streaming. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Hecho con</span>
              <Heart size={16} className="text-red-500" />
              <span>para streamers deportivos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;