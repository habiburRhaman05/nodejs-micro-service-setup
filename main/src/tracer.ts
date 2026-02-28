import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";

export const initTracer = () => {
  const provider = new NodeTracerProvider();
  provider.addSpanProcessor(
    new SimpleSpanProcessor(new ConsoleSpanExporter())
  );
  provider.register();
};