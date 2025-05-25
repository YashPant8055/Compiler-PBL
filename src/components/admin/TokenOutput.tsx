
import { FaListUl } from 'react-icons/fa';

const TokenOutput = ({ tokens } : {tokens: Array<{type: string, value: string}>}) => {
  const getTokenColor = (type: string) : {className: string} => {
    if (type === 'Keyword') return {className: 'text-tokenKeyword'};
    if (type === 'Identifier') return {className: 'text-tokenIdentifier'};
    if (type === 'Error') return {className: 'text-tokenError'};
    return {className: 'text-muted'};
  };

  return (
    <div className="bg-surface p-5 rounded-xl border border-muted shadow-lg">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-white mb-3">
        <FaListUl /> Tokens
      </h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-muted text-muted">
            <th className="py-2">Token</th>
            <th className="py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <tr key={i} className="hover:bg-background/50 transition-all duration-200">
              <td className="py-1 text-white">{token.value}</td>
              <td className={`py-1 font-medium ${getTokenColor(token.type)}`}>{token.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenOutput;
