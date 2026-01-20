import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface EventChartProps {
  data: { type: string; count: number }[];
}

export function EventChart({ data }: EventChartProps) {
  return (
    <div className="command-panel h-full">
      <div className="command-header">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="font-medium">Event Distribution</span>
        </div>
      </div>
      <div className="p-4 h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis 
              dataKey="type" 
              tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: '#888', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '4px',
                fontFamily: 'JetBrains Mono',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#00ff88' }}
              itemStyle={{ color: '#e5e5e5' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill="#00ff88"
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
