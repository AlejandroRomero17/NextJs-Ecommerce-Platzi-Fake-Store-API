// src/app/components/home/BenefitsSection.tsx
export default function BenefitsSection() {
  return (
    <section className="mt-16 text-center">
      <div className="bg-muted p-8 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-2xl">🚚</div>
            <h4 className="font-semibold">Envío Gratis</h4>
            <p className="text-muted-foreground">En compras mayores a $50</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">💯</div>
            <h4 className="font-semibold">Calidad Garantizada</h4>
            <p className="text-muted-foreground">
              Todos nuestros productos son verificados
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🔄</div>
            <h4 className="font-semibold">Devoluciones</h4>
            <p className="text-muted-foreground">30 días para devoluciones</p>
          </div>
        </div>
      </div>
    </section>
  );
}
