import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { NoSsr } from "@/components/NoSsr";
import dynamic from "next/dynamic";
import { ChangeEventHandler, FC, useState } from "react";

const LazyLoadedComponent = dynamic(
  () => import("./SomeComponent").then((module) => module.SomeComponent),
  { ssr: true, loading: () => <p>LOADING</p> }
);

const DynamicMain: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const dayjs = (await import("dayjs")).default;
    const date = dayjs(event.target.value).format("YYYY-MM-DD HH:mm:ss");
    setValue(date);
  };

  return (
    <main className="p-10">
      <section className="mb-10">
        <h1 className="text-2xl mb-3">Default</h1>
        <p>MAIN CONTENT</p>
      </section>
      <section>
        <h1>Lazy loaded component</h1>
        <Button onClick={() => setVisible(!visible)}>Toggle</Button>
        {visible && <LazyLoadedComponent />}
      </section>
      <section>
        <h1>Lazy load lib</h1>
        <Input type="date" onChange={handleChange} />
        <br />
        <p>FORMATTED : {value}</p>
      </section>
      <section>
        <h1>No SSR</h1>
        <NoSsr>asdf</NoSsr>
      </section>
    </main>
  );
};

export { DynamicMain };
