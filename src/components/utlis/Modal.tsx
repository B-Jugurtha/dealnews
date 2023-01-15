import { ReactNode, useEffect, useRef } from 'react';
import ReactPortal from './ReactPortal';

interface Props {
	children: ReactNode;
	isOpen: boolean;
	handleClose: () => void;
	className?: string;
}

export function Modal({ children, isOpen, handleClose, className = '' }: Props) {
	const nodeRef = useRef(null);
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null);
		document.body.addEventListener('keydown', closeOnEscapeKey);
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey);
		};
	}, [handleClose]);

	return (
		<>
			{isOpen ? (
				<ReactPortal wrapperId='add-client-portal '>
					<div className='fixed inset-0 flex flex-col items-center justify-center' ref={nodeRef}>
						<div className={`relative ${className} border-2 rounded-md border-base-300 shadow-base-200 shadow-lg`}>
							<div className='w-full flex p-1'>
								<span className='flex-1'></span>
								<button onClick={handleClose} className='hover:cursor-pointer'>
									<svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg' className='p-1'>
										<path
											d='M20.1667 2.18096L18.1524 0.166672L10.1667 8.15239L2.18097 0.166672L0.166687 2.18096L8.1524 10.1667L0.166687 18.1524L2.18097 20.1667L10.1667 12.181L18.1524 20.1667L20.1667 18.1524L12.181 10.1667L20.1667 2.18096Z'
											fill='#393C57'
										/>
									</svg>
								</button>
							</div>
							<div className='modal-content'>{children}</div>
						</div>
					</div>
				</ReactPortal>
			) : (
				''
			)}
		</>
	);
}
export default Modal;
