'use client';

export default function ProductCardSkeleton() {
  return (
    <div className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 h-fit animate-pulse">
      
      <div className="relative aspect-[4/5] bg-gray-800 overflow-hidden">
        
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800"></div>
        
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent -skew-x-12 animate-shimmer"></div>
        
        
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700"></div>
      </div>

      
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="mb-3 sm:mb-4">
          
          <div className="h-5 sm:h-6 bg-gray-700 rounded-lg mb-2 w-3/4"></div>
          
          
          <div className="space-y-1">
            <div className="h-3 sm:h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-3 sm:h-4 bg-gray-800 rounded w-2/3"></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 sm:mb-4">
          
          <div className="h-6 sm:h-8 bg-gray-700 rounded-lg w-24 sm:w-28"></div>
          
          
          <div className="h-4 sm:h-5 bg-gray-800 rounded w-16 sm:w-20"></div>
        </div>

        
        <div className="h-10 sm:h-12 bg-gray-700 rounded-xl w-full"></div>
      </div>
    </div>
  );
}