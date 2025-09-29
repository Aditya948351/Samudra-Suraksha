import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Send } from 'lucide-react';

interface AlertCreatorProps {
  onSend?: (alert: { message: string; severity: string }) => void;
}

export default function AlertCreator({ onSend }: AlertCreatorProps) {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'info' | 'warning' | 'critical'>('info');

  const handleSend = () => {
    if (message.trim()) {
      onSend?.({ message, severity });
      setMessage('');
      setSeverity('info');
    }
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'info':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card data-testid="alert-creator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Create Alert
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Message Input */}
        <div className="space-y-2">
          <Label htmlFor="alert-message">Alert Message</Label>
          <Textarea
            id="alert-message"
            placeholder="Enter alert message for citizens..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={280}
            rows={4}
            data-testid="textarea-alert-message"
          />
          <p className="text-xs text-muted-foreground text-right">
            {message.length}/280 characters
          </p>
        </div>

        {/* Severity Selector */}
        <div className="space-y-3">
          <Label>Alert Severity</Label>
          <RadioGroup value={severity} onValueChange={(value: any) => setSeverity(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="info" id="info" data-testid="radio-info" />
              <Label htmlFor="info" className="flex items-center gap-2 cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                Information
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="warning" id="warning" data-testid="radio-warning" />
              <Label htmlFor="warning" className="flex items-center gap-2 cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                Warning
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="critical" id="critical" data-testid="radio-critical" />
              <Label htmlFor="critical" className="flex items-center gap-2 cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                Critical
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="p-4 rounded-lg bg-muted border">
            <div className="flex items-start gap-3">
              <Badge className={`${getSeverityColor(severity)} text-white`}>
                {severity.toUpperCase()}
              </Badge>
              <p className="text-sm flex-1">
                {message || 'Your alert message will appear here...'}
              </p>
            </div>
          </div>
        </div>

        {/* Geographic Area Info */}
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            Draw a zone on the map to target specific areas (feature available in full version)
          </p>
        </div>

        {/* Send Button */}
        <Button 
          className="w-full gap-2" 
          onClick={handleSend}
          disabled={!message.trim()}
          data-testid="button-send-alert"
        >
          <Send className="h-4 w-4" />
          Send Alert
        </Button>
      </CardContent>
    </Card>
  );
}
