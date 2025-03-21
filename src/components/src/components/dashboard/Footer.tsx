
const DashboardFooter = () => {
  return (
    <footer className="mt-12 mb-8 text-center text-xs text-muted-foreground">
      <p>Data Analytics Dashboard © {new Date().getFullYear()}</p>
      <p className="mt-1">Data updates every 5 seconds with simulated fluctuations</p>
    </footer>
  );
};

export default DashboardFooter;
