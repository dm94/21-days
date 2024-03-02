import Menu from '@components/menu';
import './style.css';

export default function Home() {
  return (
    <div className='home'>
      <div className='calendar' id='calendar'>
        <Menu />
      </div>
      <div className='configuration' id='configuration' />
      <div className='theory' id='theory' />
    </div>
  );
}
