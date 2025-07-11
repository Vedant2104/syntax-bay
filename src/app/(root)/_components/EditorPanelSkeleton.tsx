import { Terminal } from "lucide-react";

export function EditorPanelSkeleton() {
  return (
    <div className="relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl blur-2xl animate-pulse" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-ping" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-ping" style={{ top: '60%', left: '80%', animationDelay: '1s' }} />
        <div className="absolute w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-ping" style={{ top: '40%', left: '60%', animationDelay: '2s' }} />
      </div>

      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6 h-[600px]">
        {/* Editor Area Skeleton */}
        <div className="relative rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          {/* Animated shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_ease-in-out_infinite]" />
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 animate-pulse" />
          <div className="h-[600px] bg-[#1e1e2e]/50 backdrop-blur-sm p-4 relative">
            {/* Typing cursor animation */}
            <div className="absolute top-4 left-16 w-0.5 h-4 bg-blue-400 animate-pulse" />
            
            {/* Code line skeletons with staggered animations */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <div 
                  className="w-12 h-4 bg-white/5 rounded animate-pulse" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
                <div
                  className="h-4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded animate-pulse"
                  style={{ 
                    width: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${i * 0.1 + 0.2}s`
                  }}
                />
                {/* Random syntax highlighting colors */}
                {Math.random() > 0.7 && (
                  <div 
                    className="w-16 h-4 bg-blue-400/20 rounded animate-pulse"
                    style={{ animationDelay: `${i * 0.1 + 0.4}s` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar with loading dots */}
        <div className="mt-3 flex justify-between items-center">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-green-400/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-yellow-400/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-red-400/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <div className="w-40 h-6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg animate-pulse" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" style={{ padding: '1px' }}>
        <div className="w-full h-full bg-[#181825] rounded-xl" />
      </div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50 relative">
              <Terminal className="w-4 h-4 text-blue-400/50 animate-pulse" />
              {/* Pulsing dot indicator */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
            </div>
            <div className="w-16 h-4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded animate-pulse" />
          </div>
          
          {/* Status indicators */}
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-yellow-400/60 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 bg-blue-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Output Area Skeleton */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e2e] to-[#1a1a2e] rounded-xl -z-10 animate-pulse" />
          
          {/* Scanning line effect */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-[scan_3s_ease-in-out_infinite]" />
          </div>
          
          <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4 h-[600px]">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                {/* Animated loading icon */}
                <div className="relative w-12 h-12 mx-auto mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl animate-spin" />
                  <div className="absolute inset-2 bg-[#1e1e2e] rounded-lg" />
                  <div className="absolute inset-3 bg-blue-400/40 rounded animate-pulse" />
                </div>
                
                {/* Animated text with typing effect */}
                <div className="relative">
                  <div className="w-48 h-4 mx-auto bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded animate-pulse" />
                  <div className="w-32 h-3 mx-auto mt-2 bg-white/5 rounded animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                {/* Loading dots */}
                <div className="flex justify-center gap-1 mt-4">
                  <div className="w-1 h-1 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1 h-1 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-1 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="space-y-6 p-4 relative">
      {/* Global floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-1 h-1 bg-blue-400/10 rounded-full animate-ping" style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
        <div className="absolute w-1 h-1 bg-purple-400/10 rounded-full animate-ping" style={{ top: '80%', left: '90%', animationDelay: '2s' }} />
        <div className="absolute w-1 h-1 bg-cyan-400/10 rounded-full animate-ping" style={{ top: '50%', left: '95%', animationDelay: '4s' }} />
      </div>
      
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
}