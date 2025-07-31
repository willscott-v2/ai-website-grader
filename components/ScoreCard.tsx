import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  findings: string[];
  recommendations: string[];
  details?: Record<string, number>;
}

export default function ScoreCard({ 
  title, 
  score, 
  status, 
  findings, 
  recommendations, 
  details 
}: ScoreCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5" />;
      case 'good':
        return <CheckCircle className="w-5 h-5" />;
      case 'needs-improvement':
        return <AlertCircle className="w-5 h-5" />;
      case 'poor':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
            {getStatusIcon(status)}
            <span className="ml-1 capitalize">{status.replace('-', ' ')}</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </span>
            <div className="ml-4 flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    score >= 80 ? 'bg-green-500' : 
                    score >= 60 ? 'bg-blue-500' : 
                    score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {/* Findings */}
        {findings.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Key Findings:</h4>
            <ul className="space-y-1">
              {findings.map((finding, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations:</h4>
            <ul className="space-y-1">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Scores */}
        {details && Object.keys(details).length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Detailed Scores:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className={`font-medium ${getScoreColor(value)}`}>
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 