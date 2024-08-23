function DashboardPage({ createdAt }: { createdAt: Date }) {
  return (
    <div className="text-xl font-normal text-primary">
      <h3>سلام 👋</h3>
      <p className="text-foreground/50">
        آگهی های خود را ثبت کنید تا هزاران نفر آن را مشاهده کنند
      </p>
      <div className="mt-24 flex w-fit rounded-sm bg-primary/30 px-2 py-1">
        <p className="m-0 ml-3 font-normal">تاریخ عضویت:</p>
        <span className="text-primary">
          {new Date(createdAt).toLocaleDateString("fa-IR")}
        </span>
      </div>
    </div>
  );
}

export default DashboardPage;
