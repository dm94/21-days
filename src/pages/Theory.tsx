import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, TrendingUp, CheckCircle, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';

const Theory: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const handleStartHabit = () => {
    navigate('/');
  };

  const seoTitle = currentLang === 'es' 
    ? 'Teoría de los 21 Días - Ciencia detrás de la Formación de Hábitos'
    : '21-Day Theory - Science Behind Habit Formation';
    
  const seoDescription = currentLang === 'es'
    ? 'Descubre la ciencia detrás de la teoría de los 21 días para formar hábitos. Aprende cómo funciona la neuroplasticidad y por qué 21 días es el tiempo ideal para crear nuevos hábitos duraderos.'
    : 'Discover the science behind the 21-day theory for habit formation. Learn how neuroplasticity works and why 21 days is the ideal time to create lasting new habits.';

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        url="https://21days.deeme.dev/theory"
        type="article"
      />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t('theory.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('theory.subtitle')}
            </p>
          </header>

          {/* Main Introduction */}
          <article className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <header className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-blue-500 mr-3" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-gray-800">
                {t('theory.main.title')}
              </h2>
            </header>
          <p className="text-gray-600 leading-relaxed mb-6">
            {t('theory.main.description')}
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-800 italic text-lg">
              {t('theory.main.quote')}
            </p>
          </div>
          </article>

          {/* Scientific Foundation */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <header className="flex items-center mb-6">
              <Target className="w-8 h-8 text-green-500 mr-3" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-gray-800">
                {t('theory.science.title')}
              </h2>
            </header>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <Brain className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.science.neuroplasticity.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.science.neuroplasticity.description')}
              </p>
            </div>
            <div className="text-center p-4">
              <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.science.repetition.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.science.repetition.description')}
              </p>
            </div>
            <div className="text-center p-4">
              <CheckCircle className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.science.automation.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.science.automation.description')}
              </p>
            </div>
            </div>
          </section>

          {/* Tips for Success */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <header className="flex items-center mb-6">
              <Lightbulb className="w-8 h-8 text-orange-500 mr-3" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-gray-800">
                {t('theory.tips.title')}
              </h2>
            </header>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.tips.consistency.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.tips.consistency.description')}
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.tips.specific.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.tips.specific.description')}
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.tips.gradual.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.tips.gradual.description')}
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.tips.environment.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.tips.environment.description')}
              </p>
            </div>
            </div>
          </section>

          {/* Research References */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <header className="flex items-center mb-6">
              <BookOpen className="w-8 h-8 text-indigo-500 mr-3" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-gray-800">
                {t('theory.research.title')}
              </h2>
            </header>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.research.study1.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.research.study1.description')}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.research.study2.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.research.study2.description')}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('theory.research.study3.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('theory.research.study3.description')}
              </p>
            </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('theory.cta.title')}
            </h2>
            <p className="text-blue-100 mb-6">
              {t('theory.cta.description')}
            </p>
            <button
              onClick={handleStartHabit}
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('theory.cta.button')}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default Theory;