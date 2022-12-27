import React from 'react'
import  SimplePlaidLink  from '../../../features/marketplace/financeApp/SimplePlaidLink';
import { useStore } from '../../stores/store';

type Props = {}

export default function Default({}: Props) {
  const { userStore } = useStore();
  return (
    <>
    <SimplePlaidLink/>
    <div className="grid-container">
    <div className="grid-item">Welcome {userStore.user?.firstName}</div>
    <div className="grid-item">2</div>
  </div>
  <div className="grid-item">Welcome {userStore.user?.firstName}<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
  </>
  )
}