type Props = {
  label: string;
};

const Tag: React.FC<Props> = ({ label }) => {
  return <span className="body-s">{label}</span>;
};

export default Tag;

// <style>
//   span {
//     display: inline-flex;
//     padding: 8px 12px;
//     background-color: var(--accent-semi);
//   }
// </style>
