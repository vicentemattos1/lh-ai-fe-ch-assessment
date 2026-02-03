import { Shield, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AppHeader() {
  return (
    <header className='bg-[#1a1f2e] text-white px-6 py-4 flex items-center justify-between z-30'>
      {/* Left side - Branding */}
      <Link to="/" className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
        <div className='w-10 h-10 bg-[#252b3d] rounded-lg flex items-center justify-center'>
          <Shield className='w-6 h-6 text-white' strokeWidth={1.5} />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-white font-semibold text-base leading-tight'>Trusted Hand</h1>
          <p className='text-gray-400 text-sm leading-tight'>Citation Verification</p>
        </div>
      </Link>

      {/* Right side - Navigation and CTA */}
      <div className='flex items-center gap-6'>
        <nav className='flex items-center gap-6'>
          <Link to='/' className='text-white hover:text-gray-300 transition-colors text-sm font-medium'>
            Documents
          </Link>
          <a href='#' className='text-white hover:text-gray-300 transition-colors text-sm font-medium'>
            History
          </a>
        </nav>
        <button className='bg-[#141821] hover:bg-[#1a1f2e] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium'>
          <Scale className='w-4 h-4' strokeWidth={2} />
          <span>New Verification</span>
        </button>
      </div>
    </header>
  );
}
