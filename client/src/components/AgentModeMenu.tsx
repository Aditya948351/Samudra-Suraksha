import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Brain, Waves, AlertTriangle, MapPin, TrendingUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AgentModeMenu() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const analyzeCoastline = async (topic: string) => {
    setSelectedTopic(topic);
    setDialogOpen(true);
    setIsLoading(true);
    setAnalysis('');

    try {
      const queries: Record<string, string> = {
        overview: 'Provide an overview of the Indian coastline including major regions, characteristics, and vulnerability zones.',
        alerts: 'List current coastal hazard alerts and warnings for the Indian coastline, including severity levels and affected regions.',
        trends: 'Analyze recent trends in coastal hazards along the Indian coastline, including seasonal patterns and risk factors.',
        safety: 'Provide comprehensive coastal safety protocols and emergency response procedures for Indian coastal regions.'
      };

      const response = await fetch('/api/analyze-coastline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queries[topic] || queries.overview })
      });

      const data = await response.json();
      setAnalysis(data.response);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis('Failed to fetch analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTopicIcon = (topic: string) => {
    switch (topic) {
      case 'overview':
        return <Waves className="h-4 w-4" />;
      case 'alerts':
        return <AlertTriangle className="h-4 w-4" />;
      case 'trends':
        return <TrendingUp className="h-4 w-4" />;
      case 'safety':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getTopicTitle = (topic: string) => {
    switch (topic) {
      case 'overview':
        return 'Coastline Overview';
      case 'alerts':
        return 'Active Alerts';
      case 'trends':
        return 'Hazard Trends';
      case 'safety':
        return 'Safety Protocols';
      default:
        return 'Analysis';
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" data-testid="button-agent-mode">
            <Brain className="h-4 w-4 mr-2" />
            Agent Mode
            <Badge className="ml-2 bg-accent text-accent-foreground text-xs">AI</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>AI Coastline Analysis</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => analyzeCoastline('overview')} data-testid="menu-overview">
            <Waves className="h-4 w-4 mr-2" />
            Coastline Overview
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => analyzeCoastline('alerts')} data-testid="menu-alerts">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Active Alerts & Warnings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => analyzeCoastline('trends')} data-testid="menu-trends">
            <TrendingUp className="h-4 w-4 mr-2" />
            Hazard Trends
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => analyzeCoastline('safety')} data-testid="menu-safety">
            <MapPin className="h-4 w-4 mr-2" />
            Safety Protocols
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getTopicIcon(selectedTopic)}
              {getTopicTitle(selectedTopic)}
              <Badge className="bg-accent text-accent-foreground text-xs">Gemini AI</Badge>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Brain className="h-8 w-8 animate-pulse mx-auto mb-4 text-accent" />
                  <p className="text-sm text-muted-foreground">Analyzing coastline data...</p>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{analysis}</p>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
