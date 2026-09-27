import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  Plus, 
  ChevronRight, 
  Search,
  ArrowUpRight
} from 'lucide-react';
import { Student, FLNSkillMetric } from '../types';
import { trStudentName, trStudentInitials, trGrade, trFlnSkillName } from '../utils/i18n';

interface DashboardViewProps {
  students: Student[];
  flnSkills: FLNSkillMetric[];
  onOpenAddStudent: () => void;
  onSelectStudent: (student: Student) => void;
  onNavigateToWorksheets: () => void;
  onNavigateToTranslator: () => void;
  uiLang: 'en' | 'hi';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  flnSkills,
  onOpenAddStudent,
  onSelectStudent,
  onNavigateToWorksheets,
  uiLang
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string>('all');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<'all' | 'literacy' | 'numeracy'>('all');

  const totalStudents = students.length;
  const totalAssessments = students.reduce((acc, s) => acc + s.assessmentsCompleted, 0);
  const averageScore = Math.round(
    students.reduce((acc, s) => acc + s.avgScore, 0) / (totalStudents || 1)
  );
  const needSupportCount = students.filter((s) => s.avgScore < 75).length;

  const hoCount = students.filter((s) => s.language === 'Ho').length;
  const mundariCount = students.filter((s) => s.language === 'Mundari').length;
  const santhaliCount = students.filter((s) => s.language === 'Santhali').length;

  const filteredStudents = students.filter((student) => {
    const q = searchQuery.toLowerCase();
    const translatedName = trStudentName(student.name, uiLang).toLowerCase();
    const translatedGrade = trGrade(student.grade, uiLang).toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(q) ||
      translatedName.includes(q) ||
      student.grade.toLowerCase().includes(q) ||
      translatedGrade.includes(q);
    const matchesLang = selectedLanguageFilter === 'all' || student.language === selectedLanguageFilter;
    return matchesSearch && matchesLang;
  });

  const filteredSkills = flnSkills.filter((s) => 
    skillCategoryFilter === 'all' || s.category === skillCategoryFilter
  );

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-10">
      {/* Compact Horizontal KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div 
          id="stat-card-total-students"
          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
              {totalStudents}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {uiLang === 'hi' ? 'कुल छात्र' : 'Total Students'}
            </div>
          </div>
        </div>

        <div 
          id="stat-card-assessments-done"
          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
              {totalAssessments}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {uiLang === 'hi' ? 'पूर्ण मूल्यांकन' : 'Assessments Done'}
            </div>
          </div>
        </div>

        <div 
          id="stat-card-average-score"
          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
              {averageScore}%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {uiLang === 'hi' ? 'औसत प्राप्तांक' : 'Average Score'}
            </div>
          </div>
        </div>

        <div 
          id="stat-card-need-support"
          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
              {needSupportCount}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {uiLang === 'hi' ? 'सहायता अपेक्षित' : 'Need Support'}
            </div>
          </div>
        </div>
      </div>

      {/* Balanced 2-Column Middle Section: FLN Skills (2/3) + Language Distribution (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* FLN Skill Performance Section */}
        <div 
          id="section-fln-skill-performance"
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {uiLang === 'hi' ? 'निपुण बुनियादी दक्षता प्रदर्शन' : 'FLN Skill Performance'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {uiLang === 'hi'
                  ? 'बुनियादी साक्षरता और संख्या ज्ञान प्रगति मानक'
                  : 'Foundational Literacy & Numeracy benchmark progress'}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
              {(['all', 'literacy', 'numeracy'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSkillCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    skillCategoryFilter === cat
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'all'
                    ? (uiLang === 'hi' ? 'सभी' : 'All')
                    : cat === 'literacy'
                    ? (uiLang === 'hi' ? 'साक्षरता' : 'Literacy')
                    : (uiLang === 'hi' ? 'संख्या ज्ञान' : 'Numeracy')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSkills.map((skill) => {
              const isPassing = skill.averageScore >= skill.targetBenchmark;
              return (
                <div 
                  key={skill.id}
                  className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug">
                      {trFlnSkillName(skill, uiLang)}
                    </h3>
                    <span className="text-xs font-bold tabular-nums text-slate-900 shrink-0">
                      {skill.averageScore}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        isPassing ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${skill.averageScore}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>
                      {skill.studentsAtGradeLevel}/{skill.totalStudents} {uiLang === 'hi' ? 'छात्र मानक पर' : 'at benchmark'} ({skill.targetBenchmark}%)
                    </span>
                    <button 
                      onClick={onNavigateToWorksheets}
                      className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{uiLang === 'hi' ? 'कार्यपत्रक' : 'Worksheet'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Language Distribution Section */}
        <div 
          id="section-language-distribution"
          className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4"
        >
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {uiLang === 'hi' ? 'मातृभाषा वितरण' : 'Language Distribution'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {uiLang === 'hi' ? 'नामांकित छात्रों की प्रथम भाषा' : 'Enrolled students by mother tongue'}
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {[
              { id: 'Santhali', icon: '🌲', labelHi: 'संथाली (ओल चिकी)', labelEn: 'Santhali (Ol Chiki)', count: santhaliCount, color: 'bg-amber-500' },
              { id: 'Ho', icon: '🪶', labelHi: 'हो (वारंग क्षिति)', labelEn: 'Ho (Warang Chiti)', count: hoCount, color: 'bg-emerald-600' },
              { id: 'Mundari', icon: '🌿', labelHi: 'मुंडारी (देवनागरी)', labelEn: 'Mundari (Devanagari)', count: mundariCount, color: 'bg-sky-600' },
            ].map((lang) => (
              <div key={lang.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>{lang.icon} {uiLang === 'hi' ? lang.labelHi : lang.labelEn}</span>
                  <span className="text-slate-500 font-normal tabular-nums">
                    {lang.count} {uiLang === 'hi' ? 'छात्र' : 'students'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full ${lang.color} rounded-full`}
                    style={{ width: `${(lang.count / (totalStudents || 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Roster Section */}
      <div 
        id="section-student-roster"
        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs"
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {uiLang === 'hi' ? 'छात्र विवरण (रोस्टर)' : 'Student Roster'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {uiLang === 'hi' 
                ? 'छात्र की प्रोफाइल और कार्यपत्रक देखने के लिए नाम पर क्लिक करें' 
                : 'Select any student to view diagnostic profile and assign worksheets'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Language Filter */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
              {(['all', 'Santhali', 'Ho', 'Mundari'] as const).map((lf) => (
                <button
                  key={lf}
                  type="button"
                  onClick={() => setSelectedLanguageFilter(lf)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    selectedLanguageFilter === lf ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lf === 'all' ? (uiLang === 'hi' ? 'सभी' : 'All') : lf}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={uiLang === 'hi' ? 'छात्र खोजें...' : 'Search students...'}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600 bg-slate-50/60"
              />
            </div>
            <button
              id="btn-add-student"
              onClick={onOpenAddStudent}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{uiLang === 'hi' ? 'छात्र जोड़ें' : 'Add Student'}</span>
            </button>
          </div>
        </div>

        {/* Clean Student Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-semibold text-slate-500">
                <th className="py-3 px-5">{uiLang === 'hi' ? 'छात्र का नाम' : 'Name'}</th>
                <th className="py-3 px-4">{uiLang === 'hi' ? 'मातृभाषा' : 'Language'}</th>
                <th className="py-3 px-4">{uiLang === 'hi' ? 'कक्षा' : 'Grade'}</th>
                <th className="py-3 px-4">{uiLang === 'hi' ? 'दक्षता स्तर' : 'FLN Level'}</th>
                <th className="py-3 px-4">{uiLang === 'hi' ? 'औसत प्राप्तांक' : 'Avg Score'}</th>
                <th className="py-3 px-4 text-right">{uiLang === 'hi' ? 'प्रोफाइल' : 'Profile'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.map((student) => {
                const scoreColor = student.avgScore >= 70 ? 'text-emerald-700' : 'text-rose-600';
                return (
                  <tr
                    key={student.id}
                    id={`student-row-${student.id}`}
                    onClick={() => onSelectStudent(student)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0">
                          {trStudentInitials(student.name, student.avatarLetter, uiLang)}
                        </div>
                        <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {trStudentName(student.name, uiLang)}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-xs font-medium text-slate-700">
                      {student.language === 'Santhali'
                        ? (uiLang === 'hi' ? '🌲 संथाली' : '🌲 Santhali')
                        : student.language === 'Ho'
                        ? (uiLang === 'hi' ? '🪶 हो' : '🪶 Ho')
                        : (uiLang === 'hi' ? '🌿 मुंडारी' : '🌿 Mundari')}
                    </td>

                    <td className="py-3 px-4 text-xs text-slate-600 whitespace-nowrap">
                      {trGrade(student.grade, uiLang)}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-xs text-slate-600">
                      {student.flnLevel === 'intermediate'
                        ? (uiLang === 'hi' ? 'मध्यम स्तर' : 'Intermediate')
                        : student.flnLevel === 'beginner'
                        ? (uiLang === 'hi' ? 'प्रारंभिक स्तर' : 'Beginner')
                        : (uiLang === 'hi' ? 'उन्नत स्तर' : 'Advanced')}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`font-bold tabular-nums text-xs sm:text-sm ${scoreColor}`}>
                        {student.avgScore}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400 inline group-hover:translate-x-0.5 transition-transform" />
                    </td>
                  </tr>
                );
              })}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                    {uiLang === 'hi' ? 'खोज फ़िल्टर से कोई छात्र मेल नहीं खाता।' : 'No students match the filter.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
